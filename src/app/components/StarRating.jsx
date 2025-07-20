export default function StarRating(props) {
    return (
        <span
            style={{
                color: `${props.Color}`,
                fontSize: `${props.Size}`,
                textShadow: '1px 1px 0 #FF9600',
            }}
        >
            {Array.from({ length: props.Rating }, (_, i) => (
                <i key={i} className='fa-solid fa-star'></i>
            ))}
        </span>
    )
}
