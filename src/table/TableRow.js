export default function TableRow(props) {
    return (
        <tbody>
            {props.searchResult.map((value, i) => {
                let result = [];
                for (let key in value) {
                    result.push(value[key])
                }
                return (
                    <tr key={i}>
                        {result.map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                    </tr>
                )
            })}
        </tbody>
    )
}