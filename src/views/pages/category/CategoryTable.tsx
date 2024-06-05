import { ComponentButton, ComponentSearch, ComponentTablePagination } from "@/components";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { TypeProjectModel } from "@/models";
import { useCategoryStore } from "@/hooks";
import { CategoryCreate } from ".";

interface tableProps {
  limitInit?: number;
  itemSelect?: (customer: TypeProjectModel) => void;
  items?: any[];
  stateSelect?: boolean;
}

export const CategoryTable = (props: tableProps) => {
  const {
    itemSelect,
    limitInit = 10,
    items = [],
    stateSelect,
  } = props;

  const { categories = [], getCategories, deleteCategory } = useCategoryStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [stageList, setCategoryList] = useState<TypeProjectModel[]>([]);
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<TypeProjectModel | null>(null);
  const [query, setQuery] = useState<string>('');
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);

  useEffect(() => {
    getCategories()
  }, []);

  useEffect(() => {
    const filtered = categories.filter((e: TypeProjectModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : categories,
      page,
      rowsPerPage
    );
    setCategoryList(newList)
  }, [categories, page, rowsPerPage, query])


  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <ComponentSearch
          title="Buscar Categoria"
          search={setQuery}
        />
        <ComponentButton
          text="Crear Categoria"
          onClick={() => handleDialog(true)}
        />
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {stageList.map((stage: TypeProjectModel) => {
              const isSelected = items.includes(stage.id);
              return (
                <TableRow key={stage.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(stage)}
                      />
                    </TableCell>
                  }
                  <TableCell>{stage.name}</TableCell>

                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() => {
                          setItemEdit(stage);
                          handleDialog(true);
                        }} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteCategory(stage.id)} >
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
        total={categories.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
      {
        openDialog &&
        <CategoryCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  );
}
