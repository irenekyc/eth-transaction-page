import React, { FunctionComponent, ReactElement } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { IconType } from "react-icons/lib";

interface ServiceCardProps {
  color: string;
  title: string;
  Icon: ReactElement;
  subtitle: string;
}

const ServiceCard: FunctionComponent<ServiceCardProps> = ({
  color,
  title,
  Icon,
  subtitle,
}: ServiceCardProps) => {
  return (
    <div className="max-w-[500px] mr-auto ml-auto w-full flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
      >
        {Icon}
      </div>
      <div className={"ml-5 flex flex-col flex-1"}>
        <h3 className="mt-2 text-white text-lg">{title}</h3>
        <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className=" md:p-20 py-12 px-4 flex w-full justify-center items-center gradient-bg-services flex-col md:flex-row">
      <div className="flex md:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we <br /> continue to improve
          </h1>
        </div>
        <div className="flex-1 flex flex-col justify-start items-start w-full md:w-6/12">
          <ServiceCard
            color="bg-[#2952e3]"
            title="Security Guaranteed"
            Icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is guaranteed. We always maintain privacy and the quality of our product"
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Best Exchange Rate"
            Icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle=""
          />
          <ServiceCard
            color="bg-[#f84550]"
            title="Fatest Transaction"
            Icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle=""
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
