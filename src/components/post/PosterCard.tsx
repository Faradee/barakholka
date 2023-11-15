//TODO: FINISH POSTERCARD
const PosterCard = ({
  posterData,
}: {
  posterData: {
    name: string;
    avatar: { image: string } | null;
    createdAt: Date;
    email: string;
  };
}) => {
  return (
    <div className="wrap break-words rounded-md">
      <div>
        <p>{posterData.name}</p>
        <p>
          <span>Почта:</span> {posterData.email}
        </p>
        <p>
          <span>Зарегистрирован:</span>
          {posterData.createdAt.toLocaleDateString()}
        </p>
        <p>
          <span>Город:</span> {"city"}
        </p>
        <p>
          <span>Телефон:</span> {"phone"}
        </p>
      </div>
    </div>
  );
};

export default PosterCard;
