import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useMonthlyFeeStore } from '@/hooks';
import { MonthlyFeeModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
//import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';

interface tableProps {
  handleEdit?: (season: MonthlyFeeModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: MonthlyFeeModel) => void;
  items?: any[];
}

export const MonthlyFeeTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { monthlyFees = [], getMonthlyFee, deleteMonthlyFee } = useMonthlyFeeStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [customerList, setCustomerList] = useState<MonthlyFeeModel[]>([]);
  const [query, setQuery] = useState<string>('');


  useEffect(() => {
    getMonthlyFee()
  }, []);
  console.log("monthlyFees",monthlyFees)

  useEffect(() => {
    const filtered = monthlyFees.filter((e: MonthlyFeeModel) =>
      e.student.user.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : monthlyFees,
      page,
      rowsPerPage
    );
    setCustomerList(newList)
  }, [monthlyFees, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Pagos Cuota Mensual  "
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: `#E2F6F0`  }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>FECHA</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DNI</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre y apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Inscripcion</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>mesualidad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>pago Mes</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>saldo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>compromiso</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((monthlyfee: MonthlyFeeModel) => {
              const isSelected = items.includes(monthlyfee.id);
              return (
                <TableRow key={monthlyfee.id}  sx={{ backgroundColor: `${monthlyfee.state==true ? '#E3EFFB' :'#FCE4E4'}`}}>
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(monthlyfee)}
                      />
                    </TableCell>
                  }
                  <TableCell>{monthlyfee.payments[0].paymentDate.toString().substring(0,10)}</TableCell>
                  <TableCell>{monthlyfee.student.user.dni}</TableCell>
                  <TableCell>{`${monthlyfee.student.user.name} ${monthlyfee.student.user.lastName}`}</TableCell>
                  <TableCell>{monthlyfee.totalInscription}</TableCell>
                  <TableCell>{monthlyfee.totalAmount}</TableCell>
                  <TableCell>{monthlyfee.amountPaid}</TableCell>
                  <TableCell>{monthlyfee.amountPending}</TableCell>
                  <TableCell>{monthlyfee.payments[0].commitmentDate.toString().substring(0,10)}</TableCell>

                  
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        {/* <IconButton onClick={() => handleEdit!(monthlyfee)} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteMonthlyFee(monthlyfee.id)} >
                          <DeleteOutline color="error" />
                        </IconButton> */}
                        <InfoIcon sx={{color:'#4000FF'}}/>
                      </Stack>
                    </TableCell>
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={monthlyFees.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
