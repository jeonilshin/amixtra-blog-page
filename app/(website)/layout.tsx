import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";

async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    title: {
      default:
        settings?.title ||
        "Amixtra - Blog",
      template: "%s | Amixtra"
    },
    description:
      settings?.description ||
      "Amixtra is a company dedicated to driving innovation and technological advancements for a better world.",
    keywords: ["Amixtra Blog", "Amixtra", "Algebraing", "Blog"],
    authors: [{ name: "Amixtra" }],
    canonical: settings?.url,
    robots: {
      index: true,
      follow: true
    }
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  return (
    <>
      <Navbar {...settings} />

      <div>{children}</div>

      <Footer {...settings} />
    </>
  );
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
