import React from "react";
import {
  Modal,
  ModalOverlay,
  Dialog,
  Heading,
  Button,
} from "react-aria-components";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function DeepDiveModal({
  isOpen,
  onClose,
  title,
  children,
}: DeepDiveModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          isDismissable
          isOpen={isOpen}
          onOpenChange={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-4 lg:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-4xl outline-none"
          >
            <Modal className="bg-card border border-border rounded-4xl shadow-2xl overflow-hidden outline-none">
              <Dialog className="outline-none">
                {({ close }) => (
                  <div className="flex flex-col h-full max-h-[85vh]">
                    <header className="px-8 py-6 border-b border-border flex items-center justify-between sticky top-0 bg-card/80 backdrop-blur-md z-10">
                      <Heading className="text-2xl font-bold tracking-tight text-primary">
                        {title}
                      </Heading>
                      <Button
                        onPress={close}
                        className="p-2 rounded-full hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </header>
                    <div className="p-8 overflow-y-auto overflow-x-hidden space-y-6">
                      {children}
                    </div>
                    <footer className="p-8 border-t border-border flex justify-end">
                      <Button
                        onPress={close}
                        className="bg-primary text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                      >
                        Got it
                      </Button>
                    </footer>
                  </div>
                )}
              </Dialog>
            </Modal>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
