import React from "react";


const List = ({ items ,list,setList,editId,setEditId,deleteHandler,editItem}) => {
    // function
    
    return (
        <div className="grocery-list">
            {items.map((item) => {
                const{id,title} = item
                return <article className="grocery-item" key={id}>
                    <p className="title">{title}</p>
                    <div className="button-container">
                        <button onClick={ () =>editItem(id)} type="button" className="edit-btn">
                        <i className="bi bi-pencil-square"></i>
                        </button>
                        <button onClick={() =>deleteHandler(id)} type="button" className="delete-btn">
                        <i className="bi bi-trash3-fill"></i>
                        </button>
                    </div>

                </article>
            })}
        </div>
    )
}


export default List