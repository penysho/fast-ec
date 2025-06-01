import type { Toast as ToastType } from "@/hooks/useToast";
import { useEffect } from "react";

interface ToastProps {
	toast: ToastType;
	onRemove: (id: string) => void;
}

export function Toast({ toast, onRemove }: ToastProps) {
	useEffect(() => {
		if (toast.duration && toast.duration > 0) {
			const timer = setTimeout(() => {
				onRemove(toast.id);
			}, toast.duration);

			return () => clearTimeout(timer);
		}
	}, [toast.id, toast.duration, onRemove]);

	const getToastStyles = () => {
		switch (toast.type) {
			case "success":
				return "bg-green-50 border-green-200 text-green-800";
			case "error":
				return "bg-red-50 border-red-200 text-red-800";
			case "warning":
				return "bg-yellow-50 border-yellow-200 text-yellow-800";
			case "info":
				return "bg-blue-50 border-blue-200 text-blue-800";
			default:
				return "bg-gray-50 border-gray-200 text-gray-800";
		}
	};

	const getIconColor = () => {
		switch (toast.type) {
			case "success":
				return "text-green-400";
			case "error":
				return "text-red-400";
			case "warning":
				return "text-yellow-400";
			case "info":
				return "text-blue-400";
			default:
				return "text-gray-400";
		}
	};

	const getIcon = () => {
		switch (toast.type) {
			case "success":
				return (
					<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
						<title>成功アイコン</title>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "error":
				return (
					<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
						<title>エラーアイコン</title>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "warning":
				return (
					<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
						<title>警告アイコン</title>
						<path
							fillRule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "info":
				return (
					<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
						<title>情報アイコン</title>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clipRule="evenodd"
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div
			className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg ${getToastStyles()}`}
		>
			<div className="p-4">
				<div className="flex items-start">
					<div className={`flex-shrink-0 ${getIconColor()}`}>{getIcon()}</div>
					<div className="ml-3 w-0 flex-1 pt-0.5">
						<p className="font-medium text-sm">{toast.title}</p>
						{toast.message && (
							<p className="mt-1 text-sm opacity-90">{toast.message}</p>
						)}
					</div>
					<div className="ml-4 flex flex-shrink-0">
						<button
							type="button"
							className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
							onClick={() => onRemove(toast.id)}
						>
							<span className="sr-only">閉じる</span>
							<svg
								className="h-5 w-5 opacity-60 hover:opacity-100"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<title>閉じる</title>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

interface ToastContainerProps {
	toasts: ToastType[];
	onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
	if (toasts.length === 0) return null;

	return (
		<div className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6">
			<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
				{toasts.map((toast) => (
					<Toast key={toast.id} toast={toast} onRemove={onRemove} />
				))}
			</div>
		</div>
	);
}
