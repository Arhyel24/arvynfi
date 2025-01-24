import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ActivityItemProps {
  icon: string;
  title: string;
  subtitle: string;
  amount: string | number;
  amountColor: string;
  details?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  subtitle,
  amount,
  amountColor,
  details,
}) => (
  <Link
    href={"#"}
    className="flex items-start space-x-4 p-2 hover:bg-slate-800 h-16"
  >
    <div className="flex-shrink-0">
      <Image
        src={icon}
        alt="icon"
        className="w-8 h-8 rounded-full"
        height={8}
        width={8}
      />
    </div>
    <div className="flex-grow">
      <div className="text-sm">{title}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
      {details && <div className="text-xs text-gray-400">{details}</div>}
    </div>
    <div className={`text-sm ${amountColor}`}>{amount}</div>
  </Link>
);

export default ActivityItem;
