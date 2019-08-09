import React from 'react';
import style from './recipe.module.css'

const Recipe = (props) =>(
    <div className={style.recipe}>
        <br/>
                <img className={style.image} src={props.image} />
                <span className={style.title}>{props.label}</span>
                <div className={style.healthLabels}>
                    <span><b>Health Labels:</b></span> 
                    <br/>
                    <span>
                        {props.healthLabels.map((text,idx)=>{
                            return(
                                <i key={idx}><u>{text}</u>{idx<props.healthLabels.length -1 ? ', ' : ''}</i>
                            )
                        })}
                    </span>
                </div>
                <span style={{'fontSize':'12px','fontStyle':'italic'}}>By: {props.source}</span>
            <div className={style.linkButtons}>
                <hr />
                <a href="#" onClick={()=>props.showRecipeModal(props.index)}>Read more.</a> &nbsp;
                <a href={props.url}
                 target="_blank">Visit URL</a>     
            </div>
            <br/>
    </div>
)
export default Recipe