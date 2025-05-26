import * as React from "react";
import { Dialog } from "radix-ui";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import "./style.css";
import RegisterHook from "../../hooks/register";
import clsx from "clsx";
import Loader from "../ui/loader/loader";

const ModelRegister = ({width}) => {

    const { isRegistered, onSubmitRegister, loading } = RegisterHook();

    return (
        loading ? <Loader /> : (
            <Dialog.Root>
             {/*   <Dialog.Trigger asChild>
                    {
                        <Button
                            size="sm"
                            className={
                                `btn-yellow flex sm:flex items-center gap-2 bg-sport-gold hover:bg-sport-gold-hover text-black rounded-full px-4 h-10 font-medium
                                ${clsx(isRegistered && "hidden_f")}`
                            }
                            style={{display: width < 992 ? "none" : "flex"}}
                        >
                            <FaRegUserCircle size={16} />
                            <span>REGISTER</span>
                        </Button>
                    }
                </Dialog.Trigger> */}
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                        <Dialog.Title className="DialogTitle">Create an account</Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                            Enter your email and password to create an account
                        </Dialog.Description>
                        <form onSubmit={onSubmitRegister}>
                            <fieldset className="Fieldset">
                                <label className="Label" htmlFor="email">
                                    Email
                                </label>
                                <input type="email" className="Input" id="email" defaultValue="" required />
                            </fieldset>
                            <fieldset className="Fieldset">
                                <label className="Label" htmlFor="password">
                                    Password
                                </label>
                                <input type="password" className="Input" id="password" defaultValue="" required />
                            </fieldset>
                            <div
                                style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                            >
                                <button className="Button green">Register</button>
                            </div>
                        </form>
                        <Dialog.Close asChild>
                            <button className="IconButton" aria-label="Close">
                                <IoCloseCircleOutline size={25}/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        )
    );
};

export default ModelRegister;