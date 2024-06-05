import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useInscriptionStore } from '@/hooks';
import { InscriptionModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (season: InscriptionModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: InscriptionModel) => void;
  items?: any[];
}

export const InscriptionTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { inscriptions = [], getInscriptions, deleteInscription } = useInscriptionStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [customerList, setCustomerList] = useState<InscriptionModel[]>([]);
  const [query, setQuery] = useState<string>('');


  useEffect(() => {
    getInscriptions()
  }, []);

  useEffect(() => {
    const filtered = inscriptions.filter((e: InscriptionModel) =>
      e.student.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : inscriptions,
      page,
      rowsPerPage
    );
    setCustomerList(newList)
  }, [inscriptions, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Inscripción"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre y apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((inscription: InscriptionModel) => {
              const isSelected = items.includes(inscription.id);
              return (
                <TableRow key={inscription.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(inscription)}
                      />
                    </TableCell>
                  }
                  <TableCell>{inscription.student.name}</TableCell>
                  <TableCell>{`${inscription.student.name} ${inscription.student.lastName}`}</TableCell>
                  <TableCell>{inscription.total}</TableCell>
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() => handleEdit!(inscription)} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteInscription(inscription.id)} >
                          <DeleteOutline color="error" />
                        </IconButton>
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
        total={inscriptions.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
