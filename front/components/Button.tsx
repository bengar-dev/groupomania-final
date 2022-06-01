type ButtonProps = {
    value: string
}

export const ButtonForm = ({value}: ButtonProps) => {

    return (
       <button>
           {value}
       </button>
    )

}