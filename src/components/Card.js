export default function Card({ name, likes, id, src, onCardClick }) {
  function handleClick() {
    onCardClick({ name, likes, id, src });
  }

  return (
    <li className="card" key={id}>
      <img src={src} alt="Изображение" className="card__img" onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__name">{name}</h2>
        <div>
          <button type="button" className="card__like"></button>
          <p className="card__likecounter">{likes}</p>
        </div>
      </div>
      <button type="button" className="card__delete_visible"></button>
    </li>
  )
}