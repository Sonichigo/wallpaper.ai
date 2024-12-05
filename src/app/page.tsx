import ImageGenerator from '@/components/ImageGenerator';

export default function GeneratorPage() {
  return (
    <div className="lex justify-center items-center h-screen w-screen">
      <div className="max-w-full max-h-full">
      <ImageGenerator />
      </div>
    </div>
  );
}