function Item({ label, value, color, icon }) {
    return (
        <article className="item">
            <span className={color}>{icon}</span>
            <div>
                <h3>{value}</h3>
                <p>{label}</p>
            </div>
        </article>
    )
}

export default Item;
