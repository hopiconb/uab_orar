import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress, useTheme, useMediaQuery, Paper } from '@mui/material';
import { PDFViewerContainer } from '../common/StyledComponents';
import DownloadIcon from '@mui/icons-material/Download';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface PDFViewerProps {
  pdfUrl?: string;
  title?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ 
  pdfUrl = 'https://example.com/sample.pdf', 
  title = 'Document PDF' 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(100);

  // These functions will be implemented when we integrate an actual PDF library
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleDownload = () => {
    // This will be implemented to download the PDF
    window.open(pdfUrl, '_blank');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 1 : 0
      }}>
        <Typography variant={isMobile ? "h6" : "h5"} component="h2">
          {title}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          justifyContent: isMobile ? 'center' : 'flex-end',
          width: isMobile ? '100%' : 'auto'
        }}>
          <Button 
            size={isMobile ? "small" : "medium"} 
            variant="outlined" 
            startIcon={<ZoomOutIcon />}
            onClick={handleZoomOut}
          >
            {!isMobile && "Micșorare"}
          </Button>
          <Typography sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            px: 1,
            minWidth: isMobile ? '60px' : '80px',
            justifyContent: 'center'
          }}>
            {zoom}%
          </Typography>
          <Button 
            size={isMobile ? "small" : "medium"} 
            variant="outlined" 
            startIcon={<ZoomInIcon />}
            onClick={handleZoomIn}
          >
            {!isMobile && "Mărire"}
          </Button>
          <Button 
            size={isMobile ? "small" : "medium"} 
            variant="contained" 
            color="primary" 
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
          >
            {!isMobile && "Descarcă"}
          </Button>
        </Box>
      </Box>

      <Paper elevation={2} sx={{ mb: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 1,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Button 
            size="small" 
            variant="text" 
            startIcon={<NavigateBeforeIcon />}
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
          >
            {!isMobile && "Anterior"}
          </Button>
          
          <Typography>
            Pagina {currentPage} din {totalPages}
          </Typography>
          
          <Button 
            size="small" 
            variant="text" 
            endIcon={<NavigateNextIcon />}
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            {!isMobile && "Următor"}
          </Button>
        </Box>
      </Paper>

      <PDFViewerContainer>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%' 
          }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            backgroundColor: theme.palette.grey[100]
          }}>
            <Typography variant="body1" color="textSecondary">
              Vizualizatorul PDF va fi implementat aici
            </Typography>
          </Box>
        )}
      </PDFViewerContainer>
    </Box>
  );
};

export default React.memo(PDFViewer);
