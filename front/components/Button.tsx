type ButtonProps = {
    value: string,
    type: string,
    func: any
}

export const ButtonForm = ({value, type, func}: ButtonProps) => {

    let classBtn = ""

    if(type === "submit") classBtn = "btn-valid"
    else if(type === "delete") classBtn = "btn-del"

    return (
       <button 
       onClick={(e) => func(e)}
       className={classBtn}>
           {value}
       </button>
    )

}