import { Link } from '@nextui-org/link';


export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        {/* Logo and Slogan */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold flex items-center">
            <p className="mr-2 text-blue-500" /> CryptoQuizz
          </h2>
          <p className="text-sm">Learn, Quiz, Earn.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap space-x-8 text-sm">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/quizzes">Quizzes</Link>
          <Link href="/exchange">Exchange</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="https://twitter.com/your_twitter" isExternal>
            <p className="text-orange-400" />
          </Link>

        </div>
      </div>

      {/* Copyright and Powered By */}
      <div className="mt-8 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} CryptoQuizz. All rights reserved.</p>
        <p>
          Powered by <span className="text-primary">NextUI</span>
        </p>
      </div>
    </footer>
  );
};
