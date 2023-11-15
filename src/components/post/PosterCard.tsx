const PosterCard = ({
  posterData,
}: {
  posterData: {
    name: string;
    avatar: { image: string } | null;
    createdAt: Date;
    email: string;
    phone?: string;
    city?: string;
  };
}) => {
  return (
    <div className="wrap break-words rounded-md">
      <div>
        <p>{posterData.name}</p>
        <p>
          <span>Почта: </span>
          {posterData.email}
        </p>
        <p>
          <span>Зарегистрирован: </span>
          {posterData.createdAt.toLocaleDateString()}
        </p>
        {posterData.city && (
          <p>
            <span>Город: </span>
            {posterData.city}
          </p>
        )}
        {posterData.phone && (
          <p>
            <span>Телефон: </span>
            {posterData.phone}
          </p>
        )}
      </div>
    </div>
  );
};

export default PosterCard;
