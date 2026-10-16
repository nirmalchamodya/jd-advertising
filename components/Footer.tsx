export default function Footer() {
  return (
    <footer className="bg-black px-6 text-white md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1500px] border-t border-white/15 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
            © 2026 JD Advertising. All rights reserved.
          </p>

          <a
            href="https://famonesystems.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/35 transition duration-300 hover:text-white"
          >
            Developed by Famone Systems (Pvt) Ltd
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}