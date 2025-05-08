<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml">
    <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Student Information</title>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #2c3e50; text-align: center; }
                    .student { 
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                    }
                    .student p { margin: 10px 0; }
                </style>
            </head>
            <body>
                <h1>Student Details</h1>
                <div class="student">
                    <xsl:if test="college/student/name">
                        <p><strong>Name:</strong> <xsl:value-of select="college/student/name"/></p>
                    </xsl:if>
                    <xsl:if test="college/student/address">
                        <p><strong>Address:</strong> <xsl:value-of select="college/student/address"/></p>
                    </xsl:if>
                    <xsl:if test="college/student/phone">
                        <p><strong>Phone:</strong> <xsl:value-of select="college/student/phone"/></p>
                    </xsl:if>
                    <xsl:if test="college/student/website">
                        <p><strong>Website:</strong> <a href="{college/student/website}"><xsl:value-of select="college/student/website"/></a></p>
                    </xsl:if>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>