interface PageLoaderProps {
  message: string;
}

export default function PageLoader({ message }: PageLoaderProps) {
  return (
    <div className="bg-c-bg flex h-screen items-center justify-center">
      <p className="text-c-muted text-sm">{message}</p>
    </div>
  );
}
