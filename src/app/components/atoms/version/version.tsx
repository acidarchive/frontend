export const Version: React.FC = () => {
  return (
    <span className="text-sm text-gray-500 font-sans">
      v{process.env.NEXT_PUBLIC_APP_VERSION}
    </span>
  );
};
