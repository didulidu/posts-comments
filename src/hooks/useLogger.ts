import { useEffect } from "react"

const useLogger = (message: string, componentName: string) => {
    useEffect(() => {
        console.log(`${message} ${componentName}`)
    }, [])
}

export default useLogger;