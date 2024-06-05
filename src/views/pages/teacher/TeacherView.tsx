import { ComponentButton } from '@/components';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Add } from '@mui/icons-material';
import { TeacherModel } from '@/models';
import { TeacherCreate, TeacherTable } from '.';

export const TeacherView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<TeacherModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Docentes</Typography>
        <ComponentButton
          text="Nuevo docente"
          onClick={() => handleDialog(true)}
          startIcon={
            <SvgIcon fontSize="small">
              <Add />
            </SvgIcon>
          }
        />
      </Stack>
      <TeacherTable
        handleEdit={(v) => {
          setItemEdit(v);
          handleDialog(true);
        }}
      />
      {openDialog && (
        <TeacherCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      )}
    </>
  );
};
