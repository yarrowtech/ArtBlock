import styles from './CardGrid.module.css';

const cardData = [
  {
    title: 'Exclusive Podcasts by Our Creators',
    subtitle:
      'Discover unique podcasts created by our talented community of creators.',
    button: 'Learn more',
    bg: styles.bgYellow100,
    image: '/images/podcast.jpg',
  },
  {
    title: 'Exclusive Music by Our Creators',
    subtitle:
      'From indie beats to immersive soundscapes, discover the music that fuels creativity and passion.',
    button: 'Start free trial',
    bg: `${styles.bgRed600} ${styles.textWhite}`,
    image: '/images/music.jpg',
  },
  {
    title: 'Discover Creator Tools',
    subtitle:
      'Explore a range of tools designed to elevate your creative process. Empower your content with features that bring your vision to life.',
    button: 'Start Creating',
    bg: `${styles.bgPurple800} ${styles.textWhite}`,
  },
];

export default function CardGrid() {
  return (
    <section className={styles.cardGrid}>
      {cardData.map((card, index) => (
        <div key={index} className={`${styles.card} ${card.bg}`}>
          {card.image && <img src={card.image} alt="" />}
          <h2>{card.title}</h2>
          {card.subtitle && <p>{card.subtitle}</p>}
          {card.button && <button>{card.button}</button>}
          {card.list && (
            <ul>
              {card.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
