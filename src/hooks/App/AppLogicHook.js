import { useState, useEffect, useRef } from 'react'; // استيراد useEffect و useRef
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import UseDeCrypt from '../../hook/UseDeCrypt'; // افتراض أن هذا هو دالة مساعدة أو هوك آخر

const AppLogicHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    // استخدام useRef لتخزين مثيل الـ socket والتأكد من إنشائه مرة واحدة فقط
    const socketRef = useRef(null);

    // استخدام useEffect لإدارة دورة حياة اتصال الـ WebSocket
    useEffect(() => {
        // إذا لم يكن الـ socket موجودًا بعد، قم بإنشائه
        if (!socketRef.current) {
            socketRef.current = io("https://dashcontrol.space", {
                autoConnect: true, // الاتصال تلقائياً
                reconnectionAttempts: Infinity, // محاولات إعادة الاتصال غير محدودة
                reconnectionDelay: 1000, // تأخير 1 ثانية بين محاولات إعادة الاتصال
            });
        }

        const currentSocket = socketRef.current;

        // تعريف دالة معالج الحدث (event handler)
        const handleMatches = async (matches) => {
            setLoading(true); // تعيين حالة التحميل إلى true عند استلام البيانات
            try {
                // فك تشفير البيانات
                const deCoded = await UseDeCrypt(matches);
                const { data } = deCoded;

                // إرسال البيانات إلى Redux store
                dispatch({
                    type: "WebSocketMatches/watchingWebSocketMatches",
                    payload: data
                });
            } catch (error) {
                console.error("Error decrypting or dispatching matches:", error);
            } finally {
                setLoading(false); // تعيين حالة التحميل إلى false بعد المعالجة
            }
        };

        // إضافة مستمع الحدث "matches" إلى الـ socket
        currentSocket.on("matches", handleMatches);

        // (اختياري) إضافة مستمعين آخرين لحالة الـ socket للمراقبة
        currentSocket.on("connect", () => console.log("Socket connected!"));
        currentSocket.on("disconnect", () => console.log("Socket disconnected."));
        currentSocket.on("connect_error", (error) => console.error("Socket connection error:", error));

        // دالة التنظيف (cleanup function) التي يتم تشغيلها عند إلغاء تحميل المكون
        return () => {
            // إزالة مستمع الحدث المحدد لمنع التكرار وتسرب الذاكرة
            currentSocket.off("matches", handleMatches);
            // إزالة المستمعين الآخرين إذا تم إضافتهم
            currentSocket.off("connect");
            currentSocket.off("disconnect");
            currentSocket.off("connect_error");

            // قطع اتصال الـ socket إذا كان لا يزال متصلاً
            // هذا يضمن عدم وجود اتصالات مفتوحة غير ضرورية عند إلغاء تحميل المكون
            if (currentSocket.connected) {
                currentSocket.disconnect();
                console.log("Socket disconnected during cleanup.");
            }
            // مسح الـ ref
            socketRef.current = null;
        };
    }, [dispatch]); // مصفوفة الاعتماديات: يتم تشغيل useEffect مرة واحدة عند تحميل المكون
    // 'dispatch' هو دالة مستقرة من Redux، لذلك لا يسبب إعادة تشغيل غير ضرورية.

    return {
        loading
    };
};

export default AppLogicHook;
