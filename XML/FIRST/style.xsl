<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
    <head>
        <title>Book Detail</title>
    </head>
    <body>
        <table border="1">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Price</th>
            </tr>
            <xsl:for-each select="bookstore/book">
                <xsl:choose>
                    <xsl:when test="price &lt; 11">
                        <tr>
                            <xsl:attribute name="bgcolor">red</xsl:attribute>
                            <td><xsl:value-of select="title"/></td>
                            <td><xsl:value-of select="author"/></td>
                            <td><xsl:value-of select="year"/></td>
                            <td><xsl:value-of select="price"/></td>
                        </tr>
                    </xsl:when>

                    <xsl:otherwise >
                        <tr>
                            <td><xsl:value-of select="title"/></td>
                            <td><xsl:value-of select="author"/></td>
                            <td><xsl:value-of select="year"/></td>
                            <td><xsl:value-of select="price"/></td>
                        </tr>
                    </xsl:otherwise>
                    
                </xsl:choose>
                
            </xsl:for-each>
        </table>        
    </body>
</html>
</xsl:template>
</xsl:stylesheet>


