export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white text-center py-4 mt-8 border-t border-gray-300">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Sonichigo. All rights reserved.
        </p>
        <p className="text-sm">
          Created by{' '}
          <a
            href="https://x.com/sonichigo1219"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Animesh Pathak
          </a>
          | Powered by{' '}
          <a
            href="https://github.com/sarthak160"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Sarthak Shyngle
          </a>
        </p>
      </footer>
    );
  }
  