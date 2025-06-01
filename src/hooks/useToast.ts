import { useCallback, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
	id: string;
	type: ToastType;
	title: string;
	message?: string;
	duration?: number;
}

export function useToast() {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback((toast: Omit<Toast, "id">) => {
		const id = Math.random().toString(36).slice(2, 11);
		const newToast: Toast = {
			id,
			duration: 5000,
			...toast,
		};

		setToasts((prev) => [...prev, newToast]);

		// Auto remove after duration
		if (newToast.duration && newToast.duration > 0) {
			setTimeout(() => {
				removeToast(id);
			}, newToast.duration);
		}

		return id;
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	const success = useCallback(
		(title: string, message?: string) => {
			return addToast({ type: "success", title, message });
		},
		[addToast],
	);

	const error = useCallback(
		(title: string, message?: string) => {
			return addToast({ type: "error", title, message });
		},
		[addToast],
	);

	const warning = useCallback(
		(title: string, message?: string) => {
			return addToast({ type: "warning", title, message });
		},
		[addToast],
	);

	const info = useCallback(
		(title: string, message?: string) => {
			return addToast({ type: "info", title, message });
		},
		[addToast],
	);

	return {
		toasts,
		addToast,
		removeToast,
		success,
		error,
		warning,
		info,
	};
}
