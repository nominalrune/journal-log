export default function LoadingIndicator() {
	return <div className="flex justify-center items-center h-16">
		<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
	</div>;
}