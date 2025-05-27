import React from "react";
import Link from "next/link";
import Header from "../components/header";

const page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="text-gray-800 container mx-auto px-4 py-8 space-y-2 text-justify text-sm">
        <h1 className="font-bold text-2xl">
          Tanzania Geolocation Data{" "}
          <Link
            href="https://www.npmjs.com/package/tz-geo-data"
            className="text-sm text-blue-600"
          >
            tz-geo-data
          </Link>
        </h1>
        <p><span className="font-semibold">tz-geo-data</span> ni bando lenye data nyingi za maeneo za kijiografia za Tanzania. Miongoni mwa data hizo ni kama vile Postikodi za maeneo, Majina ya mitaa, Majina ya wilaya na zaidi. Kifurush hiki kimeunda mwaalumu kwa ajili ya watengenezaji (developers) wa ndani na nje ya Tanzania kwa lengo la kurahisisha upatikanaji wa data husika bila kuteseka</p>
        <p>Pamoja na zinayojumuisha mikoa yote, wilaya, kata, mitaa, na misimbo na postikodi, <Link href="https://www.npmjs.com/package/tz-geo-data" className="font-semibold text-blue-600">tz-geo-data</Link> hurahisisha upatikanaji wa maeneo na utambuzi wa eneo kwa urahisi. Hii inawafaa zaidi waundaji wa tovuti, mifumo, apps za simu, utoaji huduma au matumizi binafsi na inahusisha utafutaji wa eneo, kifurushi hiki ni bra zaidi kwa kutoa data za jiografia yza kuaminika na za kisasa</p>
        <p>Kifurushi kimeboreshwa kwa kuruhusu muingiliano, Ma kinaweza kutumika katika teknolojia za kisasa kama vile (React, Express, NextJs nk) hii ku kufanikisha waundaji/Developers waweze kuitumia katika sehemu mbalimbali.</p>

        <h1 className="font-bold text-2xl mt-8">Chagua <Link href="https://www.npmjs.com/package/tz-geo-data" className="font-semibold text-blue-600">tz-geo-data</Link></h1>
        <ul className="space-y-1 list-none">
          <li>Data za kina na sahihi</li>
          <li>Muundo rahisi na bora kwa developers</li>
          <li>Nzuri kwa matumizi ya kibiashara na binafsi</li>
          <li>Ndogo na nyepesi haileti uzito katika programu</li>
        </ul>

        <h1 className="font-bold text-2xl mt-8">Mwandishi</h1>
        <ul className="space-y-1 list-none text-sm">
          <li>
            Github :{" "}
            <Link
              href="https://github.com/matayo-ayo/"
              className="text-blue-800"
            >
              Matayo Ayo
            </Link>
          </li>
          <li>
            LinkedIn :{" "}
            <Link
              href="https://tz.linkedin.com/in/matayoayo"
              className="text-blue-800"
            >
              Matayo Ayo
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default page;
