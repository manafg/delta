import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog, DialogType as FluentDialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';

// Renamed local type to avoid conflict
type LocalDialogType = 'confirmation' | 'content';

interface DialogContextProps {
    openDialog: (type: LocalDialogType, onConfirm: () => void, content?: ReactNode) => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<LocalDialogType>('confirmation');
    const [dialogContent, setDialogContent] = useState<ReactNode>(null);
    const [onConfirmCallback, setOnConfirmCallback] = useState<() => void>(() => {});

    const openDialog = (type: LocalDialogType, onConfirm: () => void, content?: ReactNode) => {
        setDialogType(type);
        setOnConfirmCallback(() => onConfirm);
        setDialogContent(content || null);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setDialogContent(null);
    };

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog }}>
            {children}
            <Dialog
                hidden={!isDialogOpen}
                onDismiss={closeDialog}
                dialogContentProps={{
                    type: FluentDialogType.largeHeader,
                    title: dialogType === 'confirmation' ? 'Confirmation' : 'Content',
                    subText: dialogType === 'confirmation' ? 'Are you sure?' : 'This is some content',
                }}
            >
                {dialogContent}
                <DialogFooter>
                    <PrimaryButton onClick={onConfirmCallback}>OK</PrimaryButton>
                </DialogFooter>
            </Dialog>
        </DialogContext.Provider>
    );
};

