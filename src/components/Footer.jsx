export default function Footer() {
  return (
    <footer className="text-lg text-center relative isolate px-6 py-24 lg:px-8">
      <p className="mt-3">
        Created by <span className="font-bold">Muhammad Sabit</span>
      </p>
      <p>
        © {new Date().getFullYear()} Muhammad Sabit. All rights reserved.
      </p>
    </footer>
  );
}
