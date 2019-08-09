import React from 'react'
import style from './recipemodal.module.css'
import style2 from './recipe.module.css'
const RecipeModal = (props) => (
    <div className={style.modal}>
            <div className={style.modalDetail}>
                        <div className={style.linkButtons}>
                            <a href="#" onClick={()=>props.closeModal('close')}>BACK TO LIST</a>     
                        </div>
                        <div className={style.header}>
                            <h1 style={{'fontFamily':'Sriracha'}}>{props.label}</h1>
                            <span><i>By: <u>{props.source}</u></i></span>
                        </div>
                        <h4>Ingredients:</h4>
                        <ul style={{'fontFamily':'Courgette'}}>
                            {props.ingredients.map((data,index)=>{
                                return(
                                    <li key={index}>{data.text}</li>
                                )
                            })}
                        </ul>
                        <div className={style2.linkButtons}>
                            <hr />
                            <a href={props.url}
                            target="_blank">Visit URL</a>     
                        </div>
            </div>
            <img src={props.image} className={style.modalImage} />
    </div>
)

export default RecipeModal