import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Types = {
  title: string | string[];
  hasLink?: boolean;
  link?: string;
};

const PageTitle = ({ title, link }: Types) => {
  // Initialize the navigate function
  const router = useRouter();

  return (
    <div className="capitalize">
      {Array.isArray(title) ? (
        <div className="flex flex-wrap items-center gap-1 leading-none md:leading-normal">
          {title?.map((label, index) => (
            <div key={index + label} className="flex items-center gap-1">
              {index === 0 && link ? (
                // Only navigate if the link exists
                <a
                  onClick={() => router.push(link)}
                  className="hover:underline cursor-pointer"
                >
                  {label}
                </a>
              ) : (
                <span className="text-gray-700">{label}</span>
              )}
              {index < title.length - 1 && (
                <div>
                  <ChevronLeft />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Only display link if it exists */}
          {link ? (
            <a onClick={() => router.push(link)} className="hover:underline">
              {title}
            </a>
          ) : (
            <span className="text-gray-700">{title}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PageTitle;
