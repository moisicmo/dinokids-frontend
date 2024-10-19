import { ComponentButton } from '@/components';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Add } from '@mui/icons-material';
import { InscriptionModel } from '@/models';
import { InscriptionCreate, InscriptionTable } from '.';

export const InscriptionView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<InscriptionModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Inscripciones</Typography>
        <ComponentButton
          text="Nueva inscripción"
          onClick={() => handleDialog(true)}
          startIcon={
            <SvgIcon fontSize="small">
              <Add />
            </SvgIcon>
          }
        />
      </Stack>
      <InscriptionTable
        handleEdit={(v) => {
          setItemEdit(v);
          handleDialog(true);
        }}
      />
      {openDialog && (
        <InscriptionCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      )}
    </>
  );
};
