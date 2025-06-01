interface ImagePreviewProps {
	files: File[];
	onRemove: (index: number) => void;
}

export function ImagePreview({ files, onRemove }: ImagePreviewProps) {
	if (files.length === 0) return null;

	return (
		<div className="mt-4">
			<h4 className="mb-2 font-medium text-gray-900 text-sm">
				選択された画像 ({files.length})
			</h4>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
				{files.map((file, index) => (
					<div key={`${file.name}-${index}`} className="relative">
						<img
							src={URL.createObjectURL(file)}
							alt={`プレビュー ${index + 1}`}
							className="h-24 w-full rounded-lg object-cover"
						/>
						<button
							type="button"
							onClick={() => onRemove(index)}
							className="-top-2 -right-2 absolute rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
							aria-label={`画像${index + 1}を削除`}
						>
							<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
								<title>削除アイコン</title>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
