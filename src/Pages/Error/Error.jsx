import { Link } from "react-router";
import notFound from "../../assets/images/error.png"
import { useEffect } from "react";
import { MessageCircle, House, Mail, Phone, Search } from "lucide-react";
;
import { Helmet } from "react-helmet";

export default function Notfound() {
  useEffect(() => {
    document.title = "ErrorPage";
  }, [])

  return (
    <>
      <Helmet>
        <meta name="description" content="Oops! The page you're looking for doesn't exist. Go back to the homepage and keep shopping on Fresh Cart." />
      </Helmet>
      <section className="notfound mx-auto py-25 flex justify-center text-center items-center flex-col container">
        <h2 className="text-stone-950 text-6xl font-extrabold dark:text-white" data-aos="zoom-out">Oops! Page Not Found</h2>
        <img src={notFound} className="w-100 h-100" alt="404" loading="lazy" />
        <p className="text-slate-500 text-center text-xl py-3">The page you're looking for seems to have gone shopping!
          <br /> Don't worry, our fresh products are stil available for you.</p>
        <div className="flex gap-3">
          <Link to="/" className="px-3 py-5 rounded-full bg-mainColor hover:bg-white text-white border-2 border-mainColor hover:text-mainColor w-fit mt-2 flex items-center gap-2">
            <House /> Back to Home</Link>
        </div>
      </section>
    </>
  );
}