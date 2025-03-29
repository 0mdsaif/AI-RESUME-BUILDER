import React, { useContext, useEffect, useState, useCallback } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import ProjectsPreview from './preview/ProjectsPreview'
import AchievementsPreview from './preview/AchievementsPreview'
import { resumeThemes } from '../themes'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableSection from './preview/SortableSection';
import { Download, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { PreviewStyleSelector } from './preview/previewStyles';
import ModernTemplate from './preview/templates/ModernTemplate';
import MinimalTemplate from './preview/templates/MinimalTemplate';
import GridTemplate from './preview/templates/GridTemplate';
import TimelineTemplate from './preview/templates/TimelineTemplate';
import SplitTemplate from './preview/templates/SplitTemplate';
import CompactTemplate from './preview/templates/CompactTemplate';

const ResumePreview = ({ activeComponents, onSectionReorder }) => {
    const {resumeInfo} = useContext(ResumeInfoContext)
    const currentTheme = resumeThemes[resumeInfo?.theme || 'modern']
    const [sections, setSections] = useState(activeComponents);
    const resumeRef = React.useRef(null);
    const [isPrinting, setIsPrinting] = useState(false);
    const [currentPreviewStyle, setCurrentPreviewStyle] = useState('classic');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setSections(activeComponents);
    }, [activeComponents]);

    const handleDragEnd = (event) => {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            const newSections = arrayMove(
                sections,
                sections.indexOf(active.id),
                sections.indexOf(over.id)
            );
            setSections(newSections);
            onSectionReorder(newSections);
        }
    };

    const handlePrint = useCallback(() => {
        try {
            setIsPrinting(true);
            const printWindow = window.open('', '', 'width=850,height=1100');
            
            if (!printWindow) {
                alert('Please allow popups to download the resume');
                setIsPrinting(false);
                return;
            }

            const content = resumeRef.current;
            const styles = [...document.styleSheets]
                .map(styleSheet => {
                    try {
                        return [...styleSheet.cssRules]
                            .map(rule => rule.cssText)
                            .join('');
                    } catch (e) {
                        return '';
                    }
                })
                .join('\n');

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Resume</title>
                        <style>${styles}</style>
                    </head>
                    <body>
                        <div class="resume-preview-content" style="padding:0.5in;">
                            ${content.innerHTML}
                        </div>
                    </body>
                </html>
            `);

            printWindow.document.close();
            printWindow.focus();

            // Wait for styles to load
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
                setIsPrinting(false);
            }, 500);

        } catch (error) {
            console.error('Print error:', error);
            setIsPrinting(false);
        }
    }, []);

    const componentMap = {
        'personal': <PersonalDetailPreview resumeInfo={resumeInfo} theme={currentTheme} />,
        'summary': <SummeryPreview resumeInfo={resumeInfo} />,
        'experience': <ExperiencePreview resumeInfo={resumeInfo} />,
        'education': <EducationalPreview resumeInfo={resumeInfo} />,
        'skills': <SkillsPreview resumeInfo={resumeInfo} />,
        'projects': <ProjectsPreview resumeInfo={resumeInfo} />,
        'achievements': <AchievementsPreview resumeInfo={resumeInfo} />
    };

    const templateMap = {
        'classic': (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                    {sections.map((sectionId) => (
                        <SortableSection key={sectionId} id={sectionId}>
                            {componentMap[sectionId]}
                        </SortableSection>
                    ))}
                </SortableContext>
            </DndContext>
        ),
        'modern': <ModernTemplate resumeInfo={resumeInfo} activeComponents={activeComponents} />,
        'minimal': <MinimalTemplate resumeInfo={resumeInfo} activeComponents={activeComponents} />,
        'grid': <GridTemplate resumeInfo={resumeInfo} activeComponents={activeComponents} />,
        'timeline': <TimelineTemplate resumeInfo={resumeInfo} activeComponents={activeComponents} />,
        'split': <SplitTemplate resumeInfo={resumeInfo} activeComponents={activeComponents} />,
        'compact': <CompactTemplate resumeInfo={resumeInfo} activeComponents={activeComponents} />
    };

    return (
        
        <div 
            className="sticky top-4 h-[calc(100vh-2rem)]"
            
            
        >
            <div className="space-y-4 h-full">
                <PreviewStyleSelector 
                    currentStyle={currentPreviewStyle}
                    onStyleSelect={setCurrentPreviewStyle}
                />
                <div className="flex justify-end">
                    <Button
                        onClick={handlePrint}
                        disabled={isPrinting}
                        className="print:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white fixed bottom-4 right-4 shadow-lg z-50"
                        size="sm"
                    >
                        {isPrinting ? (
                            <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                    </Button>
                </div>

                
                
                <div className="relative h-full">
                    
                    <motion.div 
                    
                        ref={resumeRef}
                        className={`resume-preview-content h-[calc(100vh-10rem)] overflow-y-auto bg-white p-7 rounded-xl
                            ${currentTheme?.className} preview-style-${currentPreviewStyle}`}
                        style={{
                            backgroundColor: 'var(--theme-background)',
                            color: 'var(--theme-text)',
                            // width: '90%', // Adjust the width here (e.g., 80% of the container)
                            // margin: '0 auto', // Center the preview horizontally
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 30
                        }}
                    >
                        {templateMap[currentPreviewStyle]}
                    </motion.div>

                    
                </div>
                
            </div>
        </div>
    );
};

export default ResumePreview;