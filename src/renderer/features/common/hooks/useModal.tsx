import { Dialog, DialogPanel } from '@headlessui/react';
import { useState } from 'react';

export default function useModal() {
	const [isOpen, setIsOpen] = useState(false);
	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);
	const Modal = ({ children }: { children: React.ReactNode; }) => (
		<>
			<Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full max-w-md duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							{children}
						</DialogPanel>
					</div>
				</div>
				<div data-testid="backdrop" className='fixed inset-0 z-0 w-screen y-screen bg-black/40'></div>
			</Dialog>
		</>
	);

	return { isOpen, open, close, Modal };
}