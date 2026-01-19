const TitleSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center">
      <div className="text-5xl title-font font-bold mb-3">
        {title}
        <span className="text-green-500">.</span>
      </div>
      <p className="text-gray-400 text-lg my-2 font-medium">{description}</p>
    </div>
  );
};

export default TitleSection;
