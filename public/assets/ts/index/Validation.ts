export class Validation {

    constructor() {

    }

    validationString(value: any) {

        let result = (/[A-z]\s/).test(value)

        if (result)
            return
        else
            return `Verificar sus nombres y apellidos`

    }

    validationNumber(value: any) {

        let result = (/^[0-9]{1,2}$/).test(value)

        if (result)
            return
        else
            return `Verificar su edad`
    }

    validationComboBox(value: any) {

        if (value == 0)
            return `Elija una categoría`
        else
            return

    }

    validationRadioButton(value: any) {
        
        if (value == "")
            return `Debe seleccionar si está completo o no`
        else
            return
    }

}