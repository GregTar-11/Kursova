interface PageLoaderProps {
  message: string;
}

export default function PageLoader({ message }: PageLoaderProps) {
  return (
    <div className="h-screen bg-c-bg flex items-center justify-center">
      <p className="text-c-muted text-sm">{message}</p>
    </div>
  );
}
