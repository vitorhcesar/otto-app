import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '@/presentation/components/ui/button';
import { Calendar } from '@/presentation/components/ui/calendar';
import { Sheet } from '@/presentation/components/ui/sheet';

export type DatePickerSheetProps = {
  visible: boolean;
  value: Date;
  onClose: () => void;
  onSelect: (date: Date) => void;
  title?: string;
  subtitle?: string;
  confirmLabel?: string;
};

export function DatePickerSheet({
  visible,
  value,
  onClose,
  onSelect,
  title = 'Selecionar data',
  subtitle = 'Selecione a data em que essa transação foi realizada',
  confirmLabel = 'Selecionar',
}: DatePickerSheetProps) {
  const [draft, setDraft] = useState(value);
  const [month, setMonth] = useState(value);
  const [calendarKey, setCalendarKey] = useState(0);

  const handleOpen = useCallback(() => {
    setDraft(value);
    setMonth(value);
    setCalendarKey((current) => current + 1);
  }, [value]);

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      onOpen={handleOpen}
      animateLayout
      contentStyle={styles.sheet}
    >
      <Calendar
        key={calendarKey}
        mode="single"
        value={draft}
        month={month}
        onMonthChange={setMonth}
        onSelectDate={setDraft}
      />
      <Button
        label={confirmLabel}
        onPress={() => {
          onSelect(draft);
          onClose();
        }}
      />
    </Sheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
