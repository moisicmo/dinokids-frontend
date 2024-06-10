import { ComponentSearch, ComponentTablePagination } from "@/components";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { CategoryModel, RoomModel } from "@/models";
import { useRoomStore } from "@/hooks";

interface tableProps {
  handleEdit?: (room: RoomModel) => void;
  limitInit?: number;
  itemSelect?: (room: RoomModel) => void;
  items?: any[];
  stateSelect?: boolean;
}

export const RoomTable = (props: tableProps) => {
  const {
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
    stateSelect,
  } = props;

  const { rooms = [], getRooms, deleteRoom } = useRoomStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [stageList, setCategoryList] = useState<RoomModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getRooms()
  }, []);

  useEffect(() => {
    const filtered = rooms.filter((e: CategoryModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : rooms,
      page,
      rowsPerPage
    );
    setCategoryList(newList)
  }, [rooms, page, rowsPerPage, query])


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
            {stageList.map((room: RoomModel) => {
              const isSelected = items.includes(room.id);
              return (
                <TableRow key={room.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(room)}
                      /> 
                    </TableCell>
                  }
                  <TableCell>{room.name}</TableCell>

                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() =>handleEdit!(room)} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteRoom(room.id)} >
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
        total={rooms.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </>
  );
}
