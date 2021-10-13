/**
 * tHeader:   列表的头部
 * filterVal: 数据属性
 * dataList:  数据列表
 * fileName:  导出的文件名
 */
import {format} from "date-fns";

export function useExportExcel(tHeader, filterVal, dataList, fileName) {
    const execelDate = format(new Date(), "yyyy-MM-dd");
    import('./Export2Excel.js').then((excel) => {
        const data = formatJson(filterVal, dataList);
        excel.export_json_to_excel({
            title: [],
            header: tHeader,
            data: data,
            merges: [],
            filename: fileName + execelDate,
            autoWidth: true,
            bookType: "xlsx"
        });
    })
    // const {export_json_to_excel} = require("./Export2Excel.js");//注意这个Export2Excel路径

}

export function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]));
}