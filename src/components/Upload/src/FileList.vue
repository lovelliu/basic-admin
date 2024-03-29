<script lang="tsx">
import type { CSSProperties } from 'vue'
import { defineComponent, nextTick, watch } from 'vue'
import { isFunction } from '@/utils/is'
import { useModalContext } from '@/components/Modal/src/hooks/useModalContext'
import { fileListProps } from './props'

export default defineComponent({
  name: 'FileList',
  props: fileListProps,
  setup(props) {
    const modalFn = useModalContext()
    watch(
      () => props.dataSource,
      () => {
        nextTick(() => {
          modalFn?.redoModalHeight?.()
        })
      },
    )

    return () => {
      const { columns, actionColumn, dataSource } = props
      const columnList = [...columns, actionColumn]
      return (
          <table className="file-table">
            <colgroup>
              {columnList.map(item => {
                const { width = 0, dataIndex } = item
                const style: CSSProperties = {
                  width: `${width}px`,
                  minWidth: `${width}px`,
                }
                return <col style={width ? style : {}} key={dataIndex} />
              })}
            </colgroup>
            <thead>
              <tr className="file-table-tr">
                {columnList.map(item => {
                  const { title = '', align = 'center', dataIndex } = item
                  return (
                    <th className={['file-table-th', align]} key={dataIndex}>
                      {title}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {dataSource.map((record = {}, index) => {
                return (
                  <tr className="file-table-tr" key={`${index + record.name || ''}`}>
                    {columnList.map(item => {
                      const { dataIndex = '', customRender, align = 'center' } = item
                      const render = customRender && isFunction(customRender)
                      return (
                        <td className={['file-table-td', align]} key={dataIndex}>
                          {render
                            ? customRender?.({ text: record[dataIndex], record })
                            : record[dataIndex]}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
      )
    }
  },
})
</script>

<style lang="less">
  .file-table {
    width: 100%;
    border-collapse: collapse;

    .center {
      text-align: center;
    }

    .left {
      text-align: left;
    }

    .right {
      text-align: right;
    }

    &-th,
    &-td {
      padding: 12px 8px;
    }

    thead {
      background-color: @background-color-light;
    }

    table,
    td,
    th {
      border: 1px solid @border-color-base;
    }
  }
</style>
