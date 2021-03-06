import XLSX from 'xlsx'

/**
 * @description 读取表头信息
 */
export const useReadExcelHead = (sheet) => {
    const headers = []
    const range = XLSX.utils.decode_range(sheet['!ref'])
    const rowNum = range.s.r
    for (let colNum = range.s.c; colNum <= range.e.c; ++colNum) {
        const nextCell = sheet[XLSX.utils.encode_cell({ c: colNum, r: rowNum  })]
        let cellText = `void${colNum}`
        if (nextCell && nextCell.t) cellText = XLSX.utils.format_cell(nextCell)
        headers.push(cellText)
    }
    return headers
}

/** *
 * @description 读取excel原数据
 *
 */
export const useUpdateRawData = (rawFile) =>
    new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const data = e?.target?.result
            const workbook = XLSX.read(data, {type: 'array'})
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]

            const excelData = XLSX.utils.sheet_to_json(worksheet)
            const header = useReadExcelHead(worksheet)
            resolve({header, excelData})
        }
        reader.readAsArrayBuffer(rawFile)
    })

export default useUpdateRawData
