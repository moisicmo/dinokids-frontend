import { ComponentSearch, ComponentTablePagination } from "@/components";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { CategoryModel } from "@/models";
import { useCategoryStore } from "@/hooks";
import { CategoryCreate } from ".";

interface tableProps {
  handleEdit?: (category: CategoryModel) => void;
  limitInit?: number;
  itemSelect?: (category: CategoryModel) => void;
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
  const [stageList, setCategoryList] = useState<CategoryModel[]>([]);
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<CategoryModel | null>(null);
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
    const filtered = categories.filter((e: CategoryModel) =>
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
            {stageList.map((stage: CategoryModel) => {
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
