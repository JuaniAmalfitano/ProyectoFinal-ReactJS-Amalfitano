// Box.jsx
const Box = (props) => {
    return (
        <>
        <div className="box">
            <h2>{props.title}</h2>
            <div className="content">{props.children}</div>
        </div>
        </>
    )
}

export default Box;